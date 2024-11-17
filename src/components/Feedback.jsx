import styled from 'styled-components';

export const Feedback = styled.div`
  background: ${(props) => {
    if (props.status === 'error') {
      return '#efc3ba';
    }
    return '#d4efe7';
  }};
  border-color: ${(props) => {
    if (props.status === 'error') {
      return '#efc3ba';
    }
    return '#d4efe7';
  }};
  border-radius: 7px;
  border-width: 2px;

  display: flex;
  padding: 25px;
  justify-content: center;
  font-size: 1rem;
  margin: 30px;
  word-break: break-word;
`;

export const APIFeedback = (props) => {
  return <Feedback status={props.status}>{props.children}</Feedback>;
};