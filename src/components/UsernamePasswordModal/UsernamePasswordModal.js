import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Modal, Table } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { bool, shape, func } from 'prop-types';
import ALL_ACCOUNT from 'queries/allAccount';
import UsernamePasswordPopover from 'components/UsernamePasswordPopover';

const UsernamePasswordModal = ({ show, pipeline, onHide }) => {
  const [filter] = useState({
    offset: 0,
    limit: 20,
    userId: pipeline.authorId,
  });
  const { loading, error, data = {} } = useQuery(ALL_ACCOUNT, {
    variables: { filter },
  });

  if (loading) return <div className="mt-2">loading...</div>;
  if (error) return <div className="mt-2">{setErrorMessage(error)}</div>;

  const { allAccount = {} } = data;
  const { results = [] } = allAccount;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Username & Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table bordered striped hover size="sm">
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan="4">Company</th>
            </tr>
            {results
              .filter(
                item =>
                  item.recordType === 'COMPANY' &&
                  item.company === pipeline.company
              )
              .map(item => {
                const questions = [
                  item.question1,
                  item.question2,
                  item.question3,
                ];
                const answers = [item.answer1, item.answer2, item.answer3];
                return (
                  <>
                    <tr>
                      <td>{item.webSite}</td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="username"
                          value={item.username}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="password"
                          value={item.password}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <a
                          href={item.webSite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Login
                        </a>
                      </td>
                    </tr>
                    {questions.find(question => Boolean(question)) && (
                      <tr>
                        <th colSpan="4">Questions & Answers</th>
                      </tr>
                    )}
                    {questions
                      .filter(question => Boolean(question))
                      .map((question, key) => (
                        <tr key={key}>
                          <td>{question}</td>
                          <td colSpan="3">{answers[key]}</td>
                        </tr>
                      ))}
                  </>
                );
              })}
            <tr>
              <th colSpan="4">MLS</th>
            </tr>
            {results
              .filter(item => item.recordType === 'MLS')
              .map(item => {
                const questions = [
                  item.question1,
                  item.question2,
                  item.question3,
                ];
                const answers = [item.answer1, item.answer2, item.answer3];
                return (
                  <>
                    <tr>
                      <td>{item.webSite}</td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="username"
                          value={item.username}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="password"
                          value={item.password}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <a
                          href={item.webSite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Login
                        </a>
                      </td>
                    </tr>
                    {questions.find(question => Boolean(question)) && (
                      <tr>
                        <th colSpan="4">Questions & Answers</th>
                      </tr>
                    )}
                    {questions
                      .filter(question => Boolean(question))
                      .map((question, key) => (
                        <tr key={key}>
                          <td>{question}</td>
                          <td colSpan="3">{answers[key]}</td>
                        </tr>
                      ))}
                  </>
                );
              })}
            <tr>
              <th colSpan="4">Nord</th>
            </tr>
            {results
              .filter(
                item =>
                  item.recordType === 'NORD' &&
                  item.company === pipeline.company
              )
              .map(item => {
                const questions = [
                  item.question1,
                  item.question2,
                  item.question3,
                ];
                const answers = [item.answer1, item.answer2, item.answer3];
                return (
                  <>
                    <tr>
                      <td>{item.webSite}</td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="username"
                          value={item.username}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <UsernamePasswordPopover
                          account={item}
                          field="password"
                          value={item.password}
                          filter={filter}
                        />
                      </td>
                      <td>
                        <a
                          href={item.webSite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Login
                        </a>
                      </td>
                    </tr>
                    {questions.find(question => Boolean(question)) && (
                      <tr>
                        <th colSpan="4">Questions & Answers</th>
                      </tr>
                    )}
                    {questions
                      .filter(question => Boolean(question))
                      .map((question, key) => (
                        <tr key={key}>
                          <td>{question}</td>
                          <td colSpan="3">{answers[key]}</td>
                        </tr>
                      ))}
                  </>
                );
              })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

UsernamePasswordModal.propTypes = {
  show: bool,
  pipeline: shape({}),
  onHide: func,
};

UsernamePasswordModal.defaultProps = {
  show: false,
  pipeline: {},
  onHide: e => e,
};

export default UsernamePasswordModal;
