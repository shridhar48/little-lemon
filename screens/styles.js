import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#d8d8d8',
  },
  body: {
    height: '65%',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#adadad',
  },
  bodyContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textInputViewContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInputContainer: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 15,
    backgroundColor: '#d8d8d8',
  },
  buttonContainer: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#adadad',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  labelText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#202926',
    marginBottom: 10,
  },
});

export default styles;
