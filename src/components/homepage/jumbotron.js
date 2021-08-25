import JumboData from "../../fixtures/jumbo.json";

const Jumbotron = () => {
  return (
    <section className="jumbotron">
      {JumboData.map((item) => {
        return (
          <div key={item.id} className="homepage__card">
            <div className={`jumbotron__container ${item.direction}`}>
              <div className="jumbotron__container--text">
                <h1 className="homepage__title">{item.title}</h1>
                <h2 className="jumbotron__container--subtitle">
                  {item.subTitle}
                </h2>
              </div>
              <figure className="jumbotron__container--img">
                <img
                  className="jumbotron__container--image"
                  src={item.image}
                  alt={item.alt}
                />
              </figure>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Jumbotron;
