import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-32 text-center flex flex-col items-center gap-6">
      <h1 className="text-6xl font-heading font-bold text-primary-dark">404</h1>
      <p className="text-ink-600 text-lg">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button to="/" variant="filled">
        Back to home
      </Button>
    </section>
  )
}
