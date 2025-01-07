import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import DropdownInput from "../../common/form/DropdownInput";
import { IAllocateRoom } from "../../application/models/allocateRoom";
import { FORM_ERROR } from "final-form";
import { RootStoreContext } from "../../stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../common/form/ErrorMessage";
import { log } from "console";
import TextInput from "../../common/form/TextInput";
import { DateInput } from "../../common/form/DateInput";

const validate = combineValidators({
  departmentId: isRequired("Select Department"),
  courseId: isRequired("Select Course"),
  roomId: isRequired("Select Room"),
  dayId: isRequired("Select Day"),
});

const AllocateRoomForm = () => {
  const rootStore = useContext(RootStoreContext);

  const [selectedDept, setSelectedDept] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedDay, setSelectedDay] = useState();

  const { createAllocateRoom } = rootStore.allocateRoomStore;
  const { departments } = rootStore.departmentStore;
  const { courseList } = rootStore.courseStore;
  const { roomList } = rootStore.roomStore;
  const { dayList } = rootStore.dayStore;

  const departmentOptions = departments
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));
  const courseOptions = courseList
    .filter((item) => item.name)
    .map((item) => ({
      key: item.departmentId,
      text: item.name,
      value: item.departmentId,
    }));

  const roomOptions = roomList
    .filter((item) => item.roomNo)
    .map((item) => ({
      key: item.roomId,
      text: item.roomNo,
      value: item.roomId,
    }));

  const dayOptions = dayList
    .filter((item) => item.name)
    .map((item) => ({
      key: item.dayId,
      text: item.name,
      value: item.dayId,
    }));

  return (
    <FinalForm
      onSubmit={(values: IAllocateRoom) => createAllocateRoom(values).catch((error) => ({ [FORM_ERROR]: error }))}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Field name="DepartmentId" component={DropdownInput} placeholder="Select Department." fluid selection options={departmentOptions} onChange={(e: any, data: any) => setSelectedDept(data.value)} value={selectedDept} />

          <Field name="CourseId" component={DropdownInput} placeholder="Select Course." fluid selection options={courseOptions} onChange={(e: any, data: any) => setSelectedCourse(data.value)} value={selectedCourse} />

          <Field name="RoomId" component={DropdownInput} placeholder="Select Room." fluid selection options={roomOptions} onChange={(e: any, data: any) => setSelectedRoom(data.value)} value={selectedRoom} />

          <Field name="DayId" component={DropdownInput} placeholder="Select Day." fluid selection options={dayOptions} onChange={(e: any, data: any) => setSelectedDay(data.value)} value={selectedDay} />

          <Field name="timeFrom" component={DateInput} type="time" placeholder="Enter Start Time" />

          <Field name="timeTo" component={DateInput} type="time" placeholder="Enter Start Time" />

          {submitError && dirtyFieldsSinceLastSubmit && <ErrorMessage error={submitError} text="Select " />}
          <Button loading={submitting} floated="right" positive type="submit" content="Save" />
        </Form>
      )}
    />
  );
};

export default AllocateRoomForm;
