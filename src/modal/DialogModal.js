import React, { cloneElement} from 'react';
import { Col, Row, Modal } from 'react-bootstrap';

import { modalLightbox } from './helpers/modalLightbox';
import Button from 'button/Button';

const DialogModal = ({
  title,
  body,
  buttons = [],
  closeButton = true,
  onClose
}) => (
  <>
    {closeButton &&
      <Button variant="dark" className="btn-square position-absolute" icon="times" onClick={onClose} block={false} />
    }
    <Modal.Dialog className="my-0" centered>
      <div className="py-4 px-8 px-10">
        {title &&
          <Modal.Header className="justify-content-center p-0 mb-3">
            <Modal.Title className="text-center">{title}</Modal.Title>
          </Modal.Header>
        }
        {body &&
          <Modal.Body className="p-0 text-center">
            {body}
          </Modal.Body>
        }
        {buttons.length > 0 &&
          <Modal.Footer className="d-block p-0 mt-4 text-center">
            <Row className="justify-content-around">
              {buttons.map((button, i) => button ? (
                <Col key={i} xs={6}>
                  {cloneElement(button, {
                    onClick: () => onClose(button.props.onClick),
                    iconAfter: i%2 === 1
                  })}
                </Col>
              ) : null)}
            </Row>
          </Modal.Footer>
        }
      </div>
    </Modal.Dialog>
  </>
)

export default modalLightbox(DialogModal)
