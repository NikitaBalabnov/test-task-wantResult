import { Button, Layout, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux";
import { IEvent } from "../../models/IEvent";
import { fetchEvent, setEvents } from "../../store/reducers/Events/EventSlice";
import { fetchUsers } from "../../store/reducers/Login/AuthSlice";
import { dateFormate } from "../../utils/dateFormate";
import EventCalendar from "./components/EventCalendar";
import EventForm from "./components/EventForm";

type Props = {};

const Caledar = (props: Props) => {
  const dispatch = useAppDispatch();
  const [modalVissibility, setModalVissibility] = useState(false);
  const [currentFormatedDate, setCurrentFormatedDate] = useState("");
  const { guests, events } = useTypedSelector((state) => state.events);
  const { username: user } = useTypedSelector((state) => state.auth.user);
  const [event, setEvent] = useState<IEvent>({
    guest: "",
    author: "",
    date: "",
    description: "",
  } as IEvent);
  const currentDate = new Date();
  const modalOpen = () => {
    setModalVissibility(true);
  };
  const modalClose = () => {
    setModalVissibility(false);
  };
  const hendleSunmit = (data: IEvent) => {
    dispatch(setEvents(data));
    setModalVissibility(false);
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEvent(user));
    setCurrentFormatedDate(dateFormate(currentDate));
  }, []);
  return (
    <Layout>
      <EventCalendar events={events} />
      {user === "admin" && (
        <>
          <Row justify={"center"}>
            <Button onClick={modalOpen}>Add event</Button>
          </Row>
          <Modal
            title="Event Modal"
            open={modalVissibility}
            onCancel={modalClose}
            footer={[]}
          >
            <EventForm
              currentFormatedDate={currentFormatedDate}
              event={event}
              setEvent={setEvent}
              hendleSunmit={hendleSunmit}
              guests={guests}
            />
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default Caledar;
