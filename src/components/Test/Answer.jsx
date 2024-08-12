/* eslint-disable react/prop-types */
const Answer = ({ questions, refs }) => {
  const parts = {
    reading: [],
    listening: [],
    writing: [],
    speaking: [],
  };

  questions.forEach((question) => {
    if (parts[question.type]) {
      parts[question.type].push(question);
    }
  });

  console.log("part", parts);
  return (
    <div className="p-5">
      {Object.keys(parts).map(
        (partType, index) =>
          parts[partType].length > 0 && (
            <div key={index} className="p-5">
              <ul className="">
                {parts[partType].map((question) => (
                  <li
                    className=""
                    key={question.id}
                    ref={(el) => (refs.current[question.id] = el)}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta, voluptatum ea maxime quasi asperiores repellendus
                    debitis ratione maiores aliquam tenetur consectetur illum
                    neque? Dicta inventore nihil, eum unde dolores magnam.
                    {question.id}
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default Answer;
