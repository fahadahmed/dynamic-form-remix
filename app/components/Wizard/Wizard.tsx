import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ProgressIndicator, ProgressStep } from '@carbon/react';
import Field from "../Field/Field";

export interface WizardProps {
  sections: any[]
};

export default function Wizard({ sections }: WizardProps) {
  const { handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [currentSection, setCurrentSection] = useState(0);

  const updatedSections = [
    ...sections,
    {
      title: 'Confirm',
      description: 'This is the confirm screen',
      parameters: []
    },
  ];

  return (
    // <form onSubmit={handleSubmit((someData) => setData(JSON.stringify(someData)))}>
    //   <input {...register("firstName")} placeholder="First name" />
    //   <select {...register("category", { required: true })}>
    //     <option value="">Select...</option>
    //     <option value="A">Option A</option>
    //     <option value="B">Option B</option>
    //   </select>
    //   <textarea {...register("aboutYou")} placeholder="About you" />
    //   <p>{data}</p>
    //   <input type="submit" />
    // </form>
    <form onSubmit={handleSubmit((someData) => {
      console.log(someData);
      setData(JSON.stringify(someData))
    })}>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 9fr', height: '100vh', background: '#efefef' }}>
        <div style={{ padding: '1rem' }}>
          <h5 style={{ marginBottom: '1rem' }}>Steps</h5>
          <ProgressIndicator currentIndex={currentSection} vertical>
            {updatedSections?.map((step: any, index: number) => (
              <ProgressStep
                key={index}
                label={step.title}
                description={step.description}
              />
            ))}
          </ProgressIndicator>
        </div>
        {currentSection < sections.length ? (
          <Section sections={updatedSections} currentSection={currentSection} handleFormProgress={(step: number) => setCurrentSection(step)} />
        ) : <ConfirmSection data={data} currentSection={currentSection} handleFormProgress={(step: number) => setCurrentSection(step)} />}
      </div>
    </form>
  )
}

export interface ISection {
  sections: any[],
  currentSection: number,
  handleFormProgress: (section: number) => void
}
function Section({ sections, currentSection, handleFormProgress }: ISection) {
  const { register } = useForm();
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 120px', padding: '1rem' }}>
      <div className="form-content">
        <h3>{sections[currentSection].title}</h3>
        <p>{sections[currentSection].description}</p>
        {sections[currentSection].parameters.map((field: any, index: number) => (
          <div key={index}>
            <Field
              type={field.type}
              label={field.label}
              options={field.options}
              {...register(field.key, { required: field.required })}
            />
          </div>
        ))}
      </div>
      <div className="action-layer">
        <Button kind="ghost" className="full-width-button">Cancel</Button>
        <Button
          kind="tertiary"
          className="full-width-button"
          disabled={currentSection === 0}
          onClick={() => handleFormProgress(currentSection - 1)}
        >
          Back
        </Button>
        <Button
          kind="secondary"
          className="full-width-button"
          onClick={() => handleFormProgress(currentSection + 1)}
          type={currentSection === (sections.length - 2) ? "submit" : "button"}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export interface IConfirmSection {
  data: any
  currentSection: number,
  handleFormProgress: (section: number) => void
}

function ConfirmSection({ data, currentSection, handleFormProgress }: IConfirmSection) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 120px', padding: '1rem' }}>
      <div className="form-content">
        <h3>Confirm Screen</h3>
        <p>Please verify all the details here</p>
        <pre>{data}</pre>
      </div>
      <div className="action-layer">
        <Button kind="ghost" className="full-width-button">Cancel</Button>
        <Button
          kind="tertiary"
          className="full-width-button"
          onClick={() => handleFormProgress(currentSection - 1)}
        >
          Back
        </Button>
        <Button
          kind="primary"
          className="full-width-button"
          onClick={() => console.log('We need to submit the form here')}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}