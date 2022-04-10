import { NextPageContext } from "next";
import Agency from '@components/agencies/Agency';
import { getSession } from "@lib/auth";
import AgencyBottom from "@components/agencies/AgencyBottom";
import {useReducer} from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return {
      props: {
        items: [
          {
            id: 1,
            name: "Jilian Erics, MD",
            email: 'eric@outbound.consulting',
            description: "Licensed therapist with 10 years of experience",
            image: "https://cxl.com/wp-content/uploads/2016/03/aurora_bedford.jpg",
          },
          {
            id: 2,
            name: "Lawrence Hunter, MD",
            email: 'eric@outbound.consulting',
            description: "Cardiologist from California focusing on fitness and performance",
            image: "https://cxl.com/wp-content/uploads/2016/03/craig_kistler.jpg",
          },
          {
            id: 3,
            name: "Tam Warner, MD",
            email: 'eric@outbound.consulting',
            description: "Dermatologist from United Kingdom. Book me for a telemedicine session",
            image: "https://cxl.com/wp-content/uploads/2016/03/hannah_alvarez.jpg",
          },
        ]
      }
    };
  }

  return { redirect: { permanent: false, destination: "/event-types" } };
}

type iniState = {selectedAgencies: number[]};

const initialState : iniState = {selectedAgencies: []};

const reducer = (state: iniState, action: {type: string, payload: any}): {selectedAgencies: number[]} => {
  console.log(state, action);

  let selectedAgencies: number[]  = state.selectedAgencies || [];

  if (action.type === 'remove') {
    selectedAgencies = selectedAgencies.filter(id => id !== action.payload.id);
  }

  if (action.type === 'add') {
    selectedAgencies.push(action.payload.id);
  }

  return {
    selectedAgencies: selectedAgencies
  };
};

export default function HomePage({items}: {items: any}) {
  const [context, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="main-container">
      <div className="page-details">
        <h1 className="page-title">Better Help Therapy</h1>
        <p className="info-text">Book a time with one of our licensed professional therapists online today!</p>
      </div>

      <section className="agencies top-50">
        {items.map((item: any) => {
          return (
            <Agency
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              dispatch={dispatch}
            />
          )
        })}

        <AgencyBottom context={context} />
      </section>
    </div>
  );
}
