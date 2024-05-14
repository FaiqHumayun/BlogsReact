import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useComments } from '../../utils/context/CommentsContext'

const CommentForm = ({ comment, post, onCancel }) => {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const { createComment, updateComment } = useComments()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm()

  const handleCommentSubmit = handleSubmit((data) => {
    if (comment) {
      const updatedComment = { ...comment, ...data }
      updateComment(updatedComment)
      navigate('/')
    } else {
    createComment(data, post)
    formRef.current.reset()
    }
  })

  useEffect(() => {
    setValue('postId', comment?.postId || '')
    setValue('name', comment?.name || '')
    setValue('email', comment?.email || '')
    setValue('body', comment?.body || '')
  }, [comment])

  return (
    <section id='comment-form' className='w-full my-2'>
      <div className='flex items-center'>
        <form
          onSubmit={handleCommentSubmit}
          ref={formRef}
          className='w-full max-w-[700px]'
        >
          <div className='flex flex-col gap-4'>
            <div>
              <p>Body</p>
              <div>
                <textarea
                  type='text'
                  name='body'
                  rows={5}
                  className='border border-dark-4 rounded-lg w-full p-1'
                  {...register('body', {
                    required: {
                      value: true,
                      message: 'Please enter content for the post!',
                    },
                  })}
                />
                <p className='error_text'>{errors?.content?.message}</p>
              </div>
            </div>

            <div className='flex gap-4 mt-2'>
              <button
                type='submit'
                className='bg-slate-500 text-light-1 rounded-full p-2 w-24'
              >
                {comment ? 'Update' : 'Create'}
              </button>
              {comment && (
                <button
                  className='bg-light-1 text-slate-500 border border-slate-500 rounded-full p-2 w-24'
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CommentForm
