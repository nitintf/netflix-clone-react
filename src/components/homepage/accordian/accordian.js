import AccordianItem from "./accordianItem";
import AccordianData from "../../../fixtures/faqs.json";
const Accordian = () => {
  return (
    <section className="homepage__card accordian">
      <div className="accordian__container">
        <h1 className="homepage__title">Frequently Asked Questions</h1>
        <ul className="accordian__list">
          {AccordianData.map(({ id, header, body }) => {
            return <AccordianItem header={header} body={body} key={id} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Accordian;
