import pagesPermission from './pagesPermission';
import userPermission from './userPermission';
import pipelinePermission from './pipelinePermission';
import documentsPermission from './documentsPermission';
import reviewersPermssion from './reviewersPermission';
import iformPermssion from './iformPermission';
import billingPermission from './billingPermission';
import qualityControlPermission from './qualityControlPermission';
import permissionPage from './permissionPage';
import sessionPermission from './sessionPermission'

export default [
  ...pagesPermission,
  ...pipelinePermission,
  ...userPermission,
  ...documentsPermission,
  ...reviewersPermssion,
  ...iformPermssion,
  ...billingPermission,
  ...qualityControlPermission,
  ...permissionPage,
  ...sessionPermission
];
