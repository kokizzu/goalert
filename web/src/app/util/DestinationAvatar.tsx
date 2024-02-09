import React from 'react'
import { Avatar, CircularProgress } from '@mui/material'

import {
  BrokenImage,
  RotateRight as RotationIcon,
  Today as ScheduleIcon,
  Webhook as WebhookIcon,
} from '@mui/icons-material'

const builtInIcons: { [key: string]: React.ReactNode } = {
  'builtin://rotation': <RotationIcon />,
  'builtin://schedule': <ScheduleIcon />,
  'builtin://webhook': <WebhookIcon />,
}

export type DestinationAvatarProps = {
  error?: boolean
  loading?: boolean
  iconURL?: string
  iconAltText?: string

  size?: string
}

/**
 * DestinationAvatar is used to display the icon for a selected destination value.
 *
 * It will return null if the iconURL is not provided, and there is no error or loading state.
 */
export function DestinationAvatar(
  props: DestinationAvatarProps,
): React.ReactNode {
  if (props.error) {
    return (
      <Avatar>
        <BrokenImage />
      </Avatar>
    )
  }

  if (props.loading) {
    return (
      <Avatar>
        <CircularProgress data-testid='spinner' size={props.size || '1em'} />
      </Avatar>
    )
  }

  if (!props.iconURL) {
    return null
  }

  const builtInIcon = builtInIcons[props.iconURL] || null
  return (
    <Avatar
      src={builtInIcon ? undefined : props.iconURL}
      alt={props.iconAltText}
    >
      {builtInIcon}
    </Avatar>
  )
}