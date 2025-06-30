import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

function App() {
  const url = 'https://northwind.now.sh/api/categories/1'
  const { data, mutate, isLoading, error } = useSWR(url, fetcher)

  const handleUpdate = () => {
    mutate(async (currentData) => {
      const updated = {
        ...currentData,
        name: 'Updated Name from mutate',
        description: 'Updated via mutate PUT',
      }

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(updated),
      })

      const result = await res.json()
      return result
    }, {
      optimisticData: { ...data, name: 'Updating...' },
      rollbackOnError: true,
      revalidate: false,
    })
  }

  const handleCreate = () => {
    mutate(async () => {
      const newCategory = {
        name: 'New Category via mutate',
        description: 'Created via POST',
      }

      const res = await fetch('https://northwind.now.sh/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      const result = await res.json()
      return result
    }, {
      optimisticData: { name: 'Creating...', description: '...' },
      rollbackOnError: true,
      revalidate: false,
    })
  }

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <h1>SWR - Category</h1>
      <p><strong>Name:</strong> {data?.name}</p>
      <p><strong>Description:</strong> {data?.description}</p>

      <button onClick={() => mutate()}>Refetch (GET)</button>
      <button onClick={handleCreate}>Create (POST)</button>
      <button onClick={handleUpdate}>Update (PUT)</button>
    </div>
  )
}

export default App
