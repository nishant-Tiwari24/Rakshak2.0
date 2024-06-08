import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Digilocker = () => {
  return (
    <Section crosses>
      <div className="container  lg:flex">
        <div className="max-w-screen flex">
            <div>
          <h1 className="h2 mb-4 md:mb-8">
            Digilocker services to store logistics and confidential data securely
          </h1>
          <Button href={'/digilocker/dashboard'}>Continue to Dashboard</Button>
          </div>

          <ul className="max-w-[30rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center text-xl">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className=" ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className=" mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
            <LeftCurve/>
            <RightCurve/>
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Digilocker;