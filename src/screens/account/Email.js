import React, {useState, useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  View,
} from 'native-base';
import {ButtonPrimary} from '../../components/Button';
import {toastr} from '../../helpers/script';
import color from '../../config/color';
import {BottomModal} from '../../components/Modal';
import {firebase} from '../../config/firebase';
import RootContext from '../../context';

const ChangeEmail = () => {
  const {
    user: {data},
  } = useContext(RootContext);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [config, setConfig] = useState({loading: false, error: false});
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = () => {
    if (config.loading) {
      return;
    } else if (!newEmail) {
      toastr('Please fill out all of this field.');
      return;
    } else if (data.email === newEmail) {
      toastr('Your new email === current email');
      return;
    }
    setConfig({loading: true, error: false});
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            setConfig({loading: false, error: false});
            toastr('Email successfully changed.', 'success');
          })
          .catch(err => {
            setConfig({loading: false, error: true});
            toastr(err.message, 'danger');
          });
      })
      .catch(() => {
        setConfig({loading: false, error: true});
        toastr('Invalid password.', 'danger');
      });
  };
  return (
    <Container>
      <BottomModal
        title="Verify"
        message="Please input your password to verify it's you."
        submitButtonText="Change"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <Content padder>
        <Form style={s.mt}>
          <Item stackedLabel>
            <Label>To verify its you, please input your password</Label>
            <Input
              disabled={config.loading}
              style={s.fontSize}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Item stackedLabel>
            <Label>New Email</Label>
            <Input
              disabled={config.loading}
              style={s.fontSize}
              secureTextEntry
              value={newEmail}
              onChangeText={text => setNewEmail(text)}
            />
          </Item>
          <ButtonPrimary disabled={config.loading} handleSubmit={() => setModalVisible(true)}>
            {config.loading ? (
              <ActivityIndicator size="large" color={color.light} />
            ) : (
              <Text>Change Email</Text>
            )}
          </ButtonPrimary>
        </Form>
      </Content>
    </Container>
  );
};

const s = StyleSheet.create({
  mt: {marginTop: 10},
  fontSize: {fontSize: 20},
});

ChangeEmail.navigationOptions = {
  title: 'Change Email',
};

export default ChangeEmail;
