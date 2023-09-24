import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonToolbar, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecordButtons = ({
  wrapper: Wrapper = Fragment,
  className,
  buttons,
  ...props
}) => {

  return buttons && buttons.length > 0 ? (
    <Wrapper>
      <ButtonToolbar className={className}>
        <Form.Row>
          {buttons.map(({ action, icon, to, onClick }, i) =>
            <Col key={i}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{action.custom || <>{action.default}<br />{props.title.single}</>}</Tooltip>}
              >
                <Button
                  className="p-0 border-0 text-muted"
                  variant="link"
                  as={to ? Link : undefined}
                  onClick={onClick ? () => onClick(props) : undefined}
                  to={to ? to(props) : undefined}
                  type={to ? null : 'button'}
                >
                  <FontAwesomeIcon icon={icon} fixedWidth />
                </Button>
              </OverlayTrigger>
            </Col>
          )}
        </Form.Row>
      </ButtonToolbar>
    </Wrapper>
  ) : null;
}

export default RecordButtons
