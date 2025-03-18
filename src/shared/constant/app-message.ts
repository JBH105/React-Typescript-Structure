export const APP_MESSAGES = {
  QUEUE_ERROR: 'Failed to process request for',
  QUEUE_SUCCESS: 'All queued requests were processed successfully.',
  QUEUE_WARNING: 'requests processed successfully: ',
  BOUNDARY_ERROR: 'Oops! Something went wrong. Redirecting to the Home.',
  TEACHER_ALREADY_TOOK_ATTENDANCE_FOR_TODAY: 'already took attendance for today.',
  WITHOUT_SAVING_ATTENDANCE_GO_BACK: 'You have unsaved attendance data. Do you want to leave without saving?',
  NO_HOMEWORK_FOR_SUBTOPIC: 'No homework sent for this Subtopic !',
  NO_LECTURES_SLIDES_AVAILABLE_FOR_SUBTOPIC: 'No lecture slides available for this Subtopic !',
  TEACHER_REPORT_SUBJECT_AND_CLASSES_ALERT_MESSAGE: 'All data are related to the a students count !',
  WARNING_UPDATE_SUBTOPIC_STATUS: 'Are you sure, want to complete the subtopic?',
  INVALID_IMAGE_FILE_TYPE: 'Invalid file type. Please upload an image file.',

} as const;
