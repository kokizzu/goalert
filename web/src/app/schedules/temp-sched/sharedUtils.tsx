import { DateTime } from 'luxon'
import React, { ReactNode } from 'react'

export type Value = {
  start: string
  end: string
  shifts: Shift[]
}

export type Shift = {
  start: string
  end: string
  userID: string

  user?: {
    id: string
    name: string
  }
}

// removes bottom margin from content text so form fields
// don't have a bunch of whitespace above them
export const contentText = {
  marginBottom: 0,
}

export const fmt = (t: string, zone = 'local'): string =>
  DateTime.fromISO(t, { zone }).toLocaleString(DateTime.DATETIME_MED)

type StepContainerProps = {
  children: ReactNode
  width?: string
}
export function StepContainer({
  children,
  width = '75%',
  ...rest
}: StepContainerProps): JSX.Element {
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center', // horizontal align
    width: '100%',
    height: '100%',
  }

  // adjusts width of centered child components
  const containerStyle = {
    width,
  }

  return (
    <div style={bodyStyle}>
      <div style={containerStyle} {...rest}>
        {children}
      </div>
    </div>
  )
}

// fmtLocal formats iso timestamp in local time; else empty string
// e.g. '9:30 AM CDT'
// Only 12-hour if the locale is.
export function fmtLocal(iso?: string): string {
  if (!iso) return ''
  const dt = DateTime.fromISO(iso, { zone: 'local' })
  return `${dt.toLocaleString(DateTime.TIME_SIMPLE)} ${dt.toFormat('ZZZZ')}`
}
