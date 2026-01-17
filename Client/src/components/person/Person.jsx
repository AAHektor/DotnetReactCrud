import PersonForm from "./PersonForm"
import PersonList from "./PersonList"

function Person() {
  const people = [
    {id:1, firstName:'John', lastName:'Doe'},
    {id:2, firstName:'John2', lastName:'Doe2'},
    {id:3, firstName:'John3', lastName:'Doe3'},
  ]

  const handlePersonEdit = (person) => {
    console.log(person)
  }
  const handlePersonDelete = (person) => {
    if(!confirm(`Are you sure to delete a person: ${person.firstName} ${person.lastName} `))
      return;
      console.log(person)
  }
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>

                </div>

                <PersonForm />
                <PersonList peopleList={people} onPersonEdit={handlePersonEdit} onPersonDelete={handlePersonDelete} />
            </div>
        </div>
    )
}

export default Person