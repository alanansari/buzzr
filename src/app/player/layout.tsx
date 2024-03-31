import "../globals.css";
import "./styles.css"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const session = await getServerSession(authOptions);
  //   if(!session||!session.user){
  //     redirect('/api/auth/signin');
  //   }
  return (
      <>
        {children}
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </>
  );
}
