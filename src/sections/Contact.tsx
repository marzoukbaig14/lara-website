import Section, { Reveal } from '../components/Section';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <p className="contact-intro">
          Have a question, an opportunity, or a cause worth taking up? Send a message here.
        </p>
        <ContactForm />
      </Reveal>
    </Section>
  );
}
