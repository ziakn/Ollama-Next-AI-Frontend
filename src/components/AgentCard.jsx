import Link from 'next/link';

export default function Card({ slug, icon, name, type, badgeIcon, description }) {
  return (
    <div className="col-md-6 col-lg-4">
      <Link href={`/agents/${slug}`} className="text-decoration-none text-dark">
        <div className="card h-100 shadow border-0 text-center">
          <div className="card-body d-flex flex-column align-items-center">
            <div
              className="text-white rounded-circle d-flex justify-content-center align-items-center mb-3"
              style={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #ff00e4, #f22f10)',
                boxShadow: '0 4px 12px rgb(255 0 0)',
              }}
            >
              <i className={`bi ${icon} fs-2`}></i>
            </div>
            <h5 className="card-title">{name}</h5>
            <span className="badge bg-dark mb-2">
              <i className={`bi ${badgeIcon} me-1`}></i> {type}
            </span>
            <p className="card-text text-muted">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
