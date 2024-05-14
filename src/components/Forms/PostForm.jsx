import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../../utils/context/PostsContext'

const PostForm = ({ post, onCancel }) => {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const { createPost, updatePost } = usePosts()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm()

  const handlePostSubmit = handleSubmit((data) => {
    if (post) {
      const updatedPost = { ...post, ...data }
      updatePost(updatedPost)
      navigate('/')
    } else {
      createPost(data)
      formRef.current.reset()
    }
  })

  useEffect(() => {
    setValue('title', post?.title || '')
    setValue('body', post?.body || '')
  }, [post])

  return (
    <section id='post-form' className='w-full my-2'>
      <div className='flex items-center'>
        <form
          onSubmit={handlePostSubmit}
          ref={formRef}
          className='w-full max-w-[700px]'
        >
          <div className='flex flex-col gap-4'>
            <div>
              <p>Title</p>
              <div>
                <input
                  type='text'
                  name='title'
                  className='border border-dark-4 rounded-lg p-1'
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'Please enter title for the post',
                    },
                  })}
                />
                <p className='error_text'>{errors?.title?.message}</p>
              </div>
            </div>

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
                {post ? 'Update' : 'Create'}
              </button>
              {post && (
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

export default PostForm
