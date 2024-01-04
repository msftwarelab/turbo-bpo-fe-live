import React, { useState, useEffect } from 'react';
import { Form, Accordion, Button } from 'react-bootstrap';
import PropTypes, { func } from 'prop-types';
import permissionOptions from 'constants/permissionOptions';
import permissionCategoryOptions from 'constants/permissionCategoryOptions';
import { StyledCard } from './styles';

const PermissionList = ({
  selectedPermissions,
  onSelectPermission = e => e,
}) => {
  const countCategoryPermission = c => {
    return permissionOptions
      .filter(p => p.category === c)
      .map(item => item.value);
  };

  const [checkAll, setCheckAll] = useState({
    PAGES: false,
    USER: false,
    PIPELINE: false,
    DOCUMENTS: false,
    REVIEWERS: false,
    IFORM: false,
    BILLINGS: false,
    QUALITY_CONTROL: false,
    PERMISSIONS: false,
    SESSIONS: false
  });

  const permissionPerCategory = {
    PAGES: countCategoryPermission('PAGES'),
    USER: countCategoryPermission('USER'),
    PIPELINE: countCategoryPermission('PIPELINE'),
    DOCUMENTS: countCategoryPermission('DOCUMENTS'),
    REVIEWERS: countCategoryPermission('REVIEWERS'),
    IFORM: countCategoryPermission('IFORM'),
    BILLINGS: countCategoryPermission('BILLINGS'),
    QUALITY_CONTROL: countCategoryPermission('QUALITY_CONTROL'),
    PERMISSIONS: countCategoryPermission('PERMISSIONS'),
    SESSIONS: countCategoryPermission('SESSIONS'),
  };

  const mapPermissionToCategory = permissions => {
    const items = {};
    permissions.forEach(permissionName => {
      Object.keys(permissionPerCategory).map(k => { 
        items[k] = items[k] || [];

        if (permissionPerCategory[k].includes(permissionName)) {
          items[k].push(permissionName);
        }
        return items
      });
    });

    return items;
  };

  const handleSelect = permission => {
    const newPermissions = [...selectedPermissions].includes(permission.value)
      ? [...selectedPermissions].filter(p => p !== permission.value)
      : [...selectedPermissions, permission.value];
    onSelectPermission(newPermissions);

    const list = mapPermissionToCategory(newPermissions);
    const permissionList = Object.keys(list);
    const selectAll = {};

    if (permissionList.length > 0) {
      Object.keys(permissionPerCategory).forEach(k => {
        selectAll[k] =
          permissionPerCategory[k].length === list[k].length ? true : false;
      });
    }

    setCheckAll(selectAll);
  };

  const handleCheckAll = k => {
    const specificCategoryPermission = permissionOptions.filter(
      item => item.category === k
    );
    let newPermissions = [...selectedPermissions];
    const status = !checkAll[k];

    specificCategoryPermission.forEach(item => {
      if (!status) {
        newPermissions = newPermissions.filter(p => p !== item.value);
      } else {
        if (!newPermissions.includes(item.value)) {
          newPermissions.push(item.value);
        }
      }
    });

    onSelectPermission(newPermissions);

    setCheckAll({
      ...checkAll,
      [k]: status,
    });
  };

  useEffect(() => {
    const newPermissions = [...selectedPermissions]
    const list = mapPermissionToCategory(newPermissions);
    const permissionList = Object.keys(list);
    const selectAll = {};

    if (permissionList.length > 0) {
      Object.keys(permissionPerCategory).forEach(k => {
        selectAll[k] =
          permissionPerCategory[k].length === list[k].length ? true : false;
      });
    }

    setCheckAll(selectAll);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Accordion defaultActiveKey="0">
      {permissionCategoryOptions.map((category, k) => (
        <StyledCard key={k}>
          <StyledCard.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={category.value}
            >
              {category.label}
            </Accordion.Toggle>
          </StyledCard.Header>

          <Accordion.Collapse eventKey={category.value}>
            <StyledCard.Body>
              <div className="mb-2">
                <Form.Check
                  checked={checkAll[category.value]}
                  type="checkbox"
                  label="Select all"
                  htmlFor="check-all"
                  onChange={() => handleCheckAll(category.value)}
                />
              </div>
              {permissionOptions
                .filter(permission => permission.category === category.value)
                .map((permission, i) => (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    checked={
                      checkAll[permission.category] ||
                      selectedPermissions.includes(permission.value)
                    }
                    onChange={() => handleSelect(permission)}
                    label={permission.label}
                  />
                ))}
            </StyledCard.Body>
          </Accordion.Collapse>
        </StyledCard>
      ))}
    </Accordion>
  );
};

PermissionList.defaultProps = {
  selectedPermissions: [],
  onSelectPermission: e => e,
};

PermissionList.propTypes = {
  selectedPermissions: PropTypes.array,
  onSelectPermission: func,
};

export default PermissionList;
