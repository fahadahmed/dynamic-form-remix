import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Wizard } from "~/components";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = () => {
  return {
    sections: [
      {
        title: 'Trip Details',
        description: 'Please enter the details of your trip',
        parameters: [
          {
            label: 'Date of travel',
            description: 'Please enter the date of travel',
            type: 'date',
            key: 'dayOfTravel',
            required: true,
            errorText: 'This is a required field.'
          },
          {
            label: 'Time of travel',
            description: 'Please enter the time of travel',
            type: 'time',
            key: 'timeOfTravel',
            required: true,
            errorText: 'This a required field.'
          },
          {
            label: 'Pickup location',
            description: 'Please enter the pickup suburb',
            type: 'dropdown-list',
            key: 'pickupLocation',
            required: true,
            errorText: 'This is a required field.',
            options: [
              { id: 1, name: 'Officer' },
              { id: 2, name: 'Pakenham' },
              { id: 3, name: 'Berwick' },
              { id: 4, name: 'Beaconsfield' },
              { id: 5, name: 'Clyde North' },
              { id: 6, name: 'Clyde' },
              { id: 7, name: 'Narre Warren' }
            ]
          },
          {
            label: 'Drop-off location',
            description: 'Please enter the drop-off airport location',
            type: 'dropdown-list',
            key: 'dropoffLocation',
            required: true,
            errorText: 'This is a required field.',
            options: [
              { id: 1, name: 'Melbourne Tullamarine Airport' },
              { id: 2, name: 'Avalon Airport' }
            ]
          },
          {
            label: 'Number of passengers',
            description: 'Please enter the total number of passengers for the trip.',
            type: 'number',
            key: 'totalPassengers',
            required: true,
            errorText: 'This is a required field.'
          },
          {
            label: 'Do you need a childseat',
            description: 'Please indicate if you need a child seat.',
            type: 'toggle',
            key: 'childseat',
            required: true,
            errorText: 'This is a required field'
          }
        ]
      },
      {
        title: 'Personal Details',
        description: 'Please enter your personal details for the trip.',
        parameters: [
          {
            label: 'Name of customer',
            description: 'Please enter a name for the customer',
            type: 'text',
            key: 'customerName',
            required: true,
            errorText: 'This is a required field. Please enter the name of the customer.'
          },
          {
            label: 'Street address',
            description: 'Please enter the address for the customer',
            type: 'text',
            key: 'streetAddress',
            required: true,
            errorText: 'This is a required field. Please enter the street address for the customer.'
          },
          {
            label: 'Phone Number',
            description: 'Please enter the mobile number for the booking',
            type: 'tel',
            key: 'phoneNumber',
            required: true,
            errorText: 'This is a required field. Please enter a phone number to recieve alerts and be contactable to our service.'
          },
          {
            label: 'Email',
            description: 'Please enter the email for the booking',
            type: 'email',
            key: 'emailAddress',
            required: true,
            errorText: 'This is a required field. Please enter an email to receive important updates for the booking.'
          }
        ]
      }
    ]
  }
}
export default function Index() {

  const { sections } = useLoaderData();
  console.log(sections);

  return (
    <Wizard sections={sections} />
  );
}
