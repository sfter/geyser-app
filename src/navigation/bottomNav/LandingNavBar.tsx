import { Box, Button, HStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Link, matchPath, matchRoutes, useLocation } from 'react-router-dom'

import {
  FeedNavIcon,
  GrantsNavIcon,
  HomeNavIcon2,
  LeaderboardNavIcon,
} from '../../components/icons'
import { getPath } from '../../constants'
import { BottomNavContainerCommonStyles } from '../../constants/styles'
import { useLayoutAnimation } from '../../hooks'

const routesForShowingLandingMenu = [
  getPath('landingPage'),
  getPath('landingFeed'),
  getPath('leaderboard'),
  getPath('projectDiscovery'),
  getPath('grants'),
  getPath('grantsRoundOne'),
  getPath('grantsRoundTwo'),
]

const LandingNavItems = [
  {
    name: 'Home',
    Icon: HomeNavIcon2,
    path: '/',
  },
  {
    name: 'Activity',
    Icon: FeedNavIcon,
    path: '/feed',
  },
  {
    name: 'Leaderboard',
    Icon: LeaderboardNavIcon,
    path: '/leaderboard',
  },
  {
    name: 'Grants',
    Icon: GrantsNavIcon,
    path: '/grants',
  },
]

export const LandingNavBar = () => {
  const location = useLocation()

  const routeMatchesForShowingLandingMenu = matchRoutes(
    routesForShowingLandingMenu.map((val) => ({ path: val })),
    location,
  )

  const shouldShowLandingNav = useMemo(
    () =>
      routeMatchesForShowingLandingMenu?.some((routeMatch) =>
        Boolean(routeMatch),
      ),
    [routeMatchesForShowingLandingMenu],
  )

  const handleScrollUp = (path: string) => {
    const currentRoute = routeMatchesForShowingLandingMenu?.find((routeMatch) =>
      Boolean(routeMatch),
    )

    if (currentRoute?.pathname === path) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.scrollingElement?.scrollTo({ top: 0 })
    }
  }

  const className = useLayoutAnimation()

  if (shouldShowLandingNav) {
    return (
      <>
        <Box height="60px" width="100%"></Box>
        <HStack
          className={className}
          paddingX="15%"
          spacing="20%"
          position="fixed"
          {...BottomNavContainerCommonStyles}
        >
          {LandingNavItems.map(({ name, path, Icon }) => {
            const isActive = Boolean(matchPath(path, location.pathname))
            return (
              <Button
                as={Link}
                to={path}
                key={name}
                variant="ghost"
                onClick={() => handleScrollUp(path)}
                _hover={{}}
                _focus={{}}
                display="flex"
                flexDirection="column"
              >
                <Icon color={isActive ? 'primary.500' : 'neutral.500'} />
              </Button>
            )
          })}
        </HStack>
      </>
    )
  }

  return null
}
