import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description: 'Login for Widgets Anonymous',
};

export default async function LoginPage(props: PageProps<'/login'>) {
  const searchParams = await props.searchParams;
  const returnTo = searchParams.returnTo;
  console.log(returnTo);

  return <LoginForm returnTo={returnTo} />;
}
