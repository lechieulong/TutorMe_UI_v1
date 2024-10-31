import MainLayout from "../layout/MainLayout";
import LinkTo from "../components/common/linkToCalendar";

const Term = () => {
  return (
    <MainLayout>
      <div className="flex justify-center bg-white mx-auto px-4 py-8">
        <p>This is our terms.</p>
      </div>
      <LinkTo/>
    </MainLayout>
  );
};

export default Term;
