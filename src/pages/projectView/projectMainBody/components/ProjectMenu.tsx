import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'

export const ProjectMenu = ({ projectName }: { projectName: string }) => {
  return (
    <Menu>
      <MenuButton
        rounded="full"
        as={IconButton}
        fontSize="22px"
        aria-label="Options"
        icon={<BsThreeDots />}
        variant="outline"
        boxShadow="none"
        border="none"
      />
      <MenuList>
        <MenuItem as={Link} to={getPath('projectDashboard', projectName)}>
          Edit project
        </MenuItem>
      </MenuList>
    </Menu>
  )
}