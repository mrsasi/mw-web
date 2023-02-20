import React, { useEffect, useState } from 'react';
import {
  Container, Flex, Grid, Card, Image, Text, TextInput, Button, Group,
} from '@mantine/core';
import './cribs.css';
import { debounce, isEmpty } from 'lodash';
import Form from './form';
import { deleteCribs, getACribs, getCribs } from '../../shared/request-handler';
import messageHelper from '../../shared/helper';
import { DELETE_MESSAGE, ERROR_MESSAGE } from '../../shared/message';

function Cribs() {
  const [opened, setOpened] = useState(false);
  const [formType, setFormType] = useState('add');
  const [editObj, setEditObj] = useState({});
  const [cribs, setCribs] = useState([]);

  const getCribsData = (params) => {
    const { search = '' } = params;
    getCribs({ search }).then((res) => {
      const { data } = res;
      setCribs(data);
    });
  };

  useEffect(() => {
    getCribsData({});
  }, []);

  const handleSearch = debounce((i) => getCribsData({ search: i }), 1000);

  const onUpdateCribsData = () => {
    getCribsData({});
  };

  const onDelete = (id) => {
    deleteCribs(id).then(() => {
      messageHelper('success', DELETE_MESSAGE);
      getCribsData({});
    }).catch(() => {
      messageHelper('error', ERROR_MESSAGE);
    });
  };

  const handleDrawer = async (type, value, id) => {
    try {
      if (type === 'edit' && id) {
        const res = await getACribs(id);
        const { data } = res;
        setEditObj(data);
        setOpened(value);
        setFormType(type);
        return;
      }
      setOpened(value);
      setFormType(type);
      return;
    } catch (error) {
      messageHelper('error', ERROR_MESSAGE);
    }
  };

  return (
    <>
      <Container mb={20}>
        <Flex
          mih={50}
          bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="space-between"
          align="center"
        >
          <Text weight={1000} ml={8}>
            Cribs
          </Text>
          <TextInput
            radius="xl"
            placeholder="Search Cribs"
            onChange={({ target: { value } }) => handleSearch(value)}
          />
          <Button mr={8} radius="xl" onClick={() => handleDrawer('add', true)}>Add</Button>
          {opened ? (
            <Form
              formType={formType}
              opened={opened}
              editObj={editObj}
              handleDrawer={handleDrawer}
              onUpdateCribsData={onUpdateCribsData}
            />
          ) : null}

        </Flex>
      </Container>
      <Container>
        {isEmpty(cribs) ? (
          <Grid justify="center" className="card-list">
            <Grid.Col span={4}><Text>No Cribs</Text></Grid.Col>
          </Grid>
        ) : (
          <Grid className="card-list">
            {cribs.map(({
              id, name, img, location,
            }) => (
              <Grid.Col span={4} key={id}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={img}
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{name}</Text>
                    <Text weight={100}>{location}</Text>
                  </Group>
                  <Flex
                    mih={50}
                    gap="md"
                    justify="space-between"
                    align="center"
                  >
                    <Button variant="light" color="blue" radius="xl" onClick={() => handleDrawer('edit', true, id)}>Edit</Button>
                    <Button variant="light" color="red" radius="xl" onClick={() => onDelete(id)}>Delete</Button>
                  </Flex>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) }
      </Container>
    </>
  );
}

export default Cribs;
