import React from "react";

const Answer = ({ questions, refs, part, isLiteral }) => {
  return (
    <div className="p-5">
      {part === 4  ? (
        <div>Writing ne</div>
      ) : (
        <div className="p-5">
          <ul>
            {questions.map((question) => (
              <li
                key={question.id}
                ref={(el) => (refs.current[question.id] = el)}
              >
                <p>Name: {question.content}</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                veritatis, velit repellendus eius voluptate quia necessitatibus
                recusandae aperiam eos ipsum quas placeat officiis, nihil fugit
                labore nisi temporibus pariatur commodi! Blanditiis rem quis
                ullam doloremque, animi temporibus adipisci officia! Incidunt
                quaerat illo neque reprehenderit eos nemo accusantium?
                Provident, error officiis repudiandae nemo aut veniam iste,
                rerum vel quod nam expedita. Quod error doloremque ducimus eos
                corporis! Ex porro dolorem quas voluptates, quis provident alias
                corrupti vero, obcaecati, ea commodi! Quisquam eaque nostrum
                magnam deleniti aut unde. Saepe corrupti iste nulla. Ullam
                corporis ut voluptatem alias dignissimos natus, fugit aut
                repudiandae, autem cupiditate fuga laudantium sint provident
                quaerat debitis quidem! Similique quod, laudantium porro
                possimus quidem aperiam suscipit unde? Error, dolorem. Voluptate
                asperiores culpa voluptates, officiis iusto nulla a nobis
                blanditiis dolore, repudiandae beatae suscipit excepturi magnam,
                ducimus dicta architecto tempora ex est alias earum. Esse
                laborum at cum velit similique. Iure, possimus. Amet ratione
                quia harum explicabo deserunt nisi quis eius pariatur voluptas,
                commodi perspiciatis, voluptatibus sequi architecto laboriosam
                exercitationem perferendis sit tempora? Explicabo repudiandae
                accusantium debitis veniam a delectus? Asperiores consequatur
                eveniet eos molestias hic repellendus dolor minus architecto
                rerum harum autem aliquam exercitationem corrupti totam
                veritatis ea debitis dolores, eius voluptates et accusantium
                molestiae sequi ducimus! Asperiores, repellendus. Aperiam esse
                amet impedit, minus commodi ullam recusandae possimus autem,
                tempora, eveniet pariatur veniam dolorum fugit accusantium
                debitis adipisci repellendus ad hic similique veritatis
                obcaecati! Repellat saepe modi accusamus iste. Praesentium natus
                facilis velit, cumque quas atque dolorum deleniti inventore,
                temporibus voluptatibus aut maxime ipsum placeat voluptates
                accusamus, obcaecati harum sint iste culpa? Ipsa debitis
                voluptatibus velit asperiores dolores modi. Nihil eius,
                aspernatur corrupti porro possimus voluptas aliquid saepe esse
                repellat ex iure dolor dolores optio velit excepturi corporis
                deserunt quae! Id similique earum, minima sint numquam ipsam
                blanditiis culpa! Ipsam harum, quis similique officia corrupti
                voluptatem sint veniam eius placeat perspiciatis quisquam illo a
                eaque, sit culpa corporis fugiat sapiente consequatur repellat
                neque facilis velit tempore nemo non. Perspiciatis. Architecto
                sint deleniti sapiente quibusdam ut, iste tenetur earum id
                cumque perferendis. Reiciendis aspernatur, ipsa doloribus, quod
                corporis, incidunt accusamus voluptatem vel tenetur nobis iste
                quae mollitia eum corrupti quaerat. Ut sequi nulla
                exercitationem delectus voluptate mollitia. Enim veniam
                exercitationem in? Nam facilis blanditiis dolorem natus esse sit
                repellendus aut, reprehenderit maxime eos soluta. Totam et
                nesciunt magnam porro repellat. Qui eaque reiciendis, maxime
                commodi saepe at corporis eligendi quos, ipsam itaque nihil eos
                dolore velit doloremque iste nulla possimus impedit quam quod
                suscipit. Facere natus ullam distinctio rerum consequatur.
                Explicabo quibusdam fugit labore obcaecati voluptatum libero
                quaerat esse id expedita placeat? Enim ea, error ab labore
                suscipit cupiditate facere earum vitae minima qui voluptate?
                Officiis doloribus aspernatur ipsam! Neque! Minima enim ut nemo
                necessitatibus iure placeat, error vel sapiente, eveniet
                voluptatibus deserunt unde repudiandae vero quo dolores illo
                ipsam. Perspiciatis provident odit deleniti autem labore
                necessitatibus similique, nobis aliquam. Exercitationem nemo
                eligendi eum sit dolore, amet quidem eos sunt obcaecati rerum
                minima quisquam? Odit quibusdam nemo, itaque aspernatur sapiente
                rem, molestias esse ipsam, deserunt suscipit placeat. Nostrum,
                blanditiis adipisci? Esse ex ab magni ipsam iusto sequi, nihil
                tempora eius numquam dignissimos unde dolorem. Perferendis,
                nostrum mollitia fugit dolorum voluptas deserunt harum aliquam,
                explicabo obcaecati nam voluptate ipsa provident corrupti.
                Adipisci enim ex delectus, ipsa minus fugiat magnam amet
                reprehenderit quis eligendi, excepturi est dolore deserunt
                facere fugit quae illum nostrum possimus iste, sunt temporibus?
                Saepe fugit animi voluptatem. Ex. Sunt quaerat aliquid quis
                autem fugiat harum voluptatum officia adipisci numquam ea
                laborum, voluptatibus eum vitae quibusdam cumque officiis ex
                alias! Harum sapiente repudiandae voluptates quas aspernatur
                modi, natus eveniet?
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Answer;
