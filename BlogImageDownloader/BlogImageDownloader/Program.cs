using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace BlogImageDownloader {
	class Program {
		static void Main(string[] args) {
			string basePath = AppDomain.CurrentDomain.BaseDirectory;
			string jsonPath = Path.Combine(basePath, "..\\..\\..\\..\\public\\blogs\\blogs.json"); // Path to the JSON file
			string imagesFolder = Path.Combine(basePath, "..\\..\\..\\..\\public\\images\\blog"); // Path to the images folder
			string imageUrlRoot = "./images/blog/"; // Image URL root for JSON file

			// Ensure the images folder exists
			Directory.CreateDirectory(imagesFolder);

			// Read the JSON file
			string jsonContent = File.ReadAllText(jsonPath);
			List<BlogPost> blogPosts = JsonConvert.DeserializeObject<List<BlogPost>>(jsonContent);

			foreach (var post in blogPosts) {
				// Download the feature image
				string featureImagePath = DownloadImage(post.FeatureImage, imagesFolder, imageUrlRoot);
				post.FeatureImage = featureImagePath;

				// Replace image URLs in content
				post.Content = ReplaceImageUrlsInContent(post.Content, imagesFolder, imageUrlRoot);
			}

			// Save the updated JSON file
			File.WriteAllText(jsonPath, JsonConvert.SerializeObject(blogPosts.OrderBy(b=>b.Id), Formatting.Indented), Encoding.UTF8);

			Console.WriteLine("Images downloaded and JSON file updated successfully!");
		}

		static string DownloadImage(string imageUrl, string folderPath, string imageUrlRoot) {
			// Check if the URL is already local
			if (imageUrl.StartsWith(imageUrlRoot)) {
				return imageUrl; // Return the existing local URL
			}

			string fileName = GenerateSafeFileName(imageUrl);
			string filePath = Path.Combine(folderPath, fileName);

			// Check if the file is already local by path
			if (!File.Exists(filePath)) {
				using (WebClient client = new WebClient()) {
					client.DownloadFile(imageUrl, filePath);
				}
			}

			return imageUrlRoot + fileName; // Return the relative path for the JSON file
		}




		static string ReplaceImageUrlsInContent(string content, string folderPath, string imageUrlRoot) {
			var matches = Regex.Matches(content, "<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>");

			foreach (Match match in matches) {
				string imageUrl = match.Groups[1].Value;
				string newImagePath = DownloadImage(imageUrl, folderPath, imageUrlRoot);
				content = content.Replace(imageUrl, newImagePath);
			}

			return content;
		}

		static string GenerateSafeFileName(string url) {
			// Generate a hash of the URL to create a unique name
			using (SHA256 sha256 = SHA256.Create()) {
				byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(url));
				StringBuilder result = new StringBuilder();
				foreach (byte b in bytes) {
					result.Append(b.ToString("x2"));
				}
				return result.ToString() + ".jpg"; // Append file extension
			}
		}
	}

	public class BlogPost {
		[JsonProperty("id")]
		public int Id { get; set; }
		
		[JsonProperty("title")] 
		public string Title { get; set; }

		[JsonProperty("category")] 
		public string Category { get; set; }

		[JsonProperty("featureImage")] 
		public string FeatureImage { get; set; }

		[JsonProperty("date")] 
		public string Date { get; set; }

		[JsonProperty("author")] 
		public string Author { get; set; }

		[JsonProperty("slug")] 
		public string Slug { get; set; }

		[JsonProperty("content")] 
		public string Content { get; set; }
	}
}
