import NotFound from '../../error/notFound'

export default function Announcement() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NotFound text="Announcement Page Not Found" backButtonVisible={false} />
    </div>
  );
}
