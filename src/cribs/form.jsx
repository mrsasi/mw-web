/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Drawer, TextInput, Group, Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';
import { createCribs, updateCribs } from '../../shared/request-handler';
import { CREATE_MESSAGE, ERROR_MESSAGE, UPDATE_MESSAGE } from '../../shared/message';
import messageHelper from '../../shared/helper';

function Form(props) {
  const {
    opened, handleDrawer, onUpdateCribsData, formType, editObj,
  } = props;
  let initialValues = {
    name: '',
    img: '',
    location: '',
  };
  let title = 'Add';
  if (formType === 'edit') {
    initialValues = editObj;
    title = 'Edit';
  }
  const form = useForm({
    initialValues,
    validate: {
      name: (value) => (value !== '' ? null : 'Please Enter Name'),
      img: (value) => (value !== '' ? null : 'Please Enterr Image URL'),
      location: (value) => (value !== '' ? null : 'Select Enter Location'),
    },
  });

  const onSubmit = async (values) => {
    try {
      form.setValues((prev) => ({ ...prev, ...values }));
      if (formType === 'add') {
        const createResponse = await createCribs(values);
        const { success } = createResponse;
        if (success) {
          handleDrawer(formType, false);
          messageHelper('success', CREATE_MESSAGE);
          onUpdateCribsData();
        }
      } else {
        const { id } = editObj;
        const updateResponse = await updateCribs(id, values);
        const { success } = updateResponse;
        if (success) {
          handleDrawer(formType, false);
          messageHelper('success', UPDATE_MESSAGE);
          onUpdateCribsData();
        }
      }
      form.reset();
    } catch (error) {
      messageHelper('error', ERROR_MESSAGE);
    }
  };

  const onClose = () => {
    handleDrawer(formType, false);
    form.reset();
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => onClose()}
      title={`${title} Crib`}
      closeOnClickOutside={false}
      position="right"
      padding="xl"
      size="xl"
    >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Image URL"
          placeholder="Enter Image URL"
          {...form.getInputProps('img')}
        />
        <TextInput
          withAsterisk
          label="Location"
          placeholder="Location"
          {...form.getInputProps('location')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Drawer>
  );
}

Form.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  onUpdateCribsData: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  editObj: PropTypes.func.isRequired,
};

export default Form;
