export const routerPathNames = {
  projectDiscovery: 'discover',
  grants: 'grants',
  entry: 'entry',
  notFound: 'not-found',
  notAuthorized: 'not-authorized',
  project: 'project',
  projects: 'projects',
  launchProject: 'launch',
  userProfile: 'profile',
  projectDashboard: 'dashboard',
  preview: 'preview',
  milestonesAndRewards: 'milestones',
  node: 'node',
};

// TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  projectDiscovery: () => `/${routerPathNames.projectDiscovery}`,
  grants: () => `/${routerPathNames.grants}`,
  notFound: () => `/${routerPathNames.notFound}`,
  notAuthorized: () => `/${routerPathNames.notAuthorized}`,
  _deprecatedPathForProject: (projectName: string) =>
    `/${routerPathNames.project}/${projectName}`,
  project: (projectName: string) =>
    `/${routerPathNames.projects}/${projectName}`,
  projectEntry: (projectName: string) =>
    `/${routerPathNames.projects}/${projectName}/entry`,
  publicProjectLaunch: () => `/${routerPathNames.launchProject}/start`,
  privateProjectLaunch: () => `/${routerPathNames.launchProject}`,
  launchProjectWithNode: (projectID: string) =>
    `/${routerPathNames.launchProject}/${projectID}/${routerPathNames.node}`,
  launchProjectWithMilestonesAndRewards: (projectID: string) =>
    `/${routerPathNames.launchProject}/${projectID}/${routerPathNames.milestonesAndRewards}`,
  userProfile: (userID: string) => `/${routerPathNames.userProfile}/${userID}`,
  projectDashboard: (projectID: string) =>
    `/${routerPathNames.projects}/${projectID}/${routerPathNames.projectDashboard}`,
  entry: (entryID: string) => `/${routerPathNames.entry}/${entryID}`,
};

type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route];

  return pathCallback(...params);
};