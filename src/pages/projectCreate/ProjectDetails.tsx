import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useNotification } from '../../utils'
import { ProjectRegion } from './components'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'
import { ProjectTagsCreateEdit } from './components/ProjectTagsCreateEdit'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { useProjectDetailsForm } from './hooks/useProjectDetailsForm'

export const ProjectDetails = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast, unexpected } = useNotification()

  const {
    updateProject,
    saveProject,
    saveTags,
    setLinks,
    setTags,
    project,
    tags,
    isDirty,
    linkError,
    tagsLoading,
    projectLoading,
  } = useProjectDetailsForm({ projectId: params.projectId })

  const onSubmit = async () => {
    if (!project) {
      return
    }

    if (linkError.includes(true)) {
      toast({
        status: 'warning',
        title: 'failed to update project',
        description: 'please enter a valid url for project links',
      })
      return
    }

    try {
      await saveTags()
      await saveProject()

      navigate(getPath('launchProjectStory', project.id))
    } catch (e) {
      unexpected()
    }
  }

  const onLeave = () => {
    navigate(
      project
        ? `${getPath('privateProjectLaunch')}/${project.id}`
        : getPath('privateProjectLaunch'),
    )
  }

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: isDirty,
  })

  const onBackClick = () => {
    if (isDirty) {
      return unsavedModal.onOpen({
        onLeave,
      })
    }

    onLeave()
  }

  if (projectLoading) {
    return <Loader />
  }

  const nextProps = {
    onClick: onSubmit,
    isLoading: tagsLoading,
    isDisabled: tagsLoading,
  }

  return (
    <>
      <ProjectCreateLayout
        continueButton={<FormContinueButton flexGrow={1} {...nextProps} />}
        onBackClick={onBackClick}
        title={
          <TitleWithProgressBar
            title={t('Links & tags')}
            subtitle={t('Create a project')}
            index={2}
            length={4}
          />
        }
      >
        <VStack spacing={6}>
          <ProjectLinks
            links={project?.links || []}
            setLinks={setLinks}
            linkError={linkError}
          />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion
            location={project?.location}
            updateProject={updateProject}
          />

          <FormContinueButton width="100%" {...nextProps} />
        </VStack>
      </ProjectCreateLayout>
      <ProjectUnsavedModal {...unsavedModal} />
    </>
  )
}
