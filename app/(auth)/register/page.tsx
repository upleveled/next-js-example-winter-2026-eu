import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
  description: 'Register for Widgets Anonymous',
};

export default async function RegisterPage(props: PageProps<'/register'>) {
  const searchParams = await props.searchParams;
  const returnTo = searchParams.returnTo;
  console.log(returnTo);

  return <RegisterForm returnTo={returnTo} />;
}
