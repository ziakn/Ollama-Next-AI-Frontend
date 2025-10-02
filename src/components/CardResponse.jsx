
export default function CardResponse ({response}){

    return (<div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title">Response</h5>
              <p className="card-text">
                <pre className="mb-0">{response.data}</pre>
              </p>
            </div>
          </div>
        </div>
      </div>);
}