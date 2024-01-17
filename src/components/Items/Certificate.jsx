import { Document, Page, pdfjs } from "react-pdf";
import "./Certificate.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Certificate({ certificate }) {
  return (
    <div className="card h-100 shadow-sm bg-white rounded">
      <div className="pdf-page-container border-top border-start border-end rounded">
        <a href={certificate.Url} target="_blank" rel="noopener noreferrer">
          <Document
            file={certificate.FileUrl}
            renderAnnotationLayer={false}
            options={{ disableAnnotationRendering: true }}
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title">{certificate.title}</h5>
        {/* <h6 className="card-subtitle mb-2 text-muted">
          {certificate.subtitle}
        </h6> */}
        <p className="card-text">{certificate.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        {/* <li className="list-group-item">
          <i className="bi bi-calendar"></i>{" "}
          {new Date(project.date).toLocaleDateString()}
        </li> */}
        {certificate.skills.length > 0 && (
          <li className="list-group-item">
            <strong>Skills:</strong> {certificate.skills.join(", ")}
          </li>
        )}
      </ul>

      <div className="card-body">
        <a
          href={certificate.Url}
          className="btn btn-outline-primary btn-sm w-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-box-arrow-up-right"></i> View Online
        </a>
      </div>
    </div>
  );
}

export default Certificate;
