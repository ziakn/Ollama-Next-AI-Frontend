export default function FirebaseLayout({ children }) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Firebase Module</h1>
        <main>{children}</main>
      </div>
    );
  }
  