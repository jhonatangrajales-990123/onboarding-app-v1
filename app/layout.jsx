import './globals.css';

export const metadata = {
  title: 'Onboarding Alegra',
  description: 'Activa tu cuenta de Alegra paso a paso',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
