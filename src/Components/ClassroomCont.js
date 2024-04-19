import React from "react";
import QuizzResults from "./QuizzResults";
import FileDisplay from "./FileDisplay";

const ClassroomCont = () => {

  return (
    <main>
      <div className="pt-6 px-4">
        <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
<FileDisplay/>
          <QuizzResults />
        </div>
      </div>
    </main>
  );
};

export default ClassroomCont;
