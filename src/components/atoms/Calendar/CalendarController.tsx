import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import event, { TrimmedEvent } from "../../../model/event";
import useAuth from "../../../common/hooks/Auth/useAuth";
import useUsersQuery from "../../../common/queries/useUsersQuery";

export default () => {
  const INITIAL_EVENT_STATE: TrimmedEvent[] = [];
  const [events, setEvents] = useState<TrimmedEvent[]>(INITIAL_EVENT_STATE);
  const { getAuthenticatedUser } = useAuth();
  const { data } = useUsersQuery();

  // todo - why does this need to be in a useEffect?
  useEffect(() => {
    const user = getAuthenticatedUser();

    // eslint-disable-next-line
    let allEvents: TrimmedEvent[] = [];

    const filteredEvents: TrimmedEvent[] | undefined = user?.events.map(
      ({ id, title, start, end }: event) => ({ id, title, start, end })
    );

    if (filteredEvents != null) {
      allEvents = [...allEvents, ...filteredEvents];
    } else {
      console.log("No events were present");
    }
    setEvents(allEvents);
  }, []);

  return (
    <>
      {/*
        todo - this seems really bad..
          since we're making an "api" call to grab the events +
          using initial events seems to only render the calendar once,
          events list will be empty the first time we render this calendar (normally).
          Because of this, we only render it with an empty list, and not after we've retrieved our data.
       */}
      {events === INITIAL_EVENT_STATE ? null : (
        <Calendar initialEvents={events} />
      )}
    </>
  );
};
