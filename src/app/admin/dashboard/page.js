import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="container-fluid">
        <h1 className="mb-4">Dashboard</h1>
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card text-white bg-primary h-100">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <p className="card-text">Manage all users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-white bg-success h-100">
              <div className="card-body">
                <h5 className="card-title">Articles</h5>
                <p className="card-text">Manage all articles</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-white bg-warning h-100">
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                <p className="card-text">Manage all categories</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-white bg-danger h-100">
              <div className="card-body">
                <h5 className="card-title">Images</h5>
                <p className="card-text">Manage gallery/images</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
