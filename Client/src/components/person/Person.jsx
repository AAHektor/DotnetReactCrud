import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Person() {
    const [people, setPeople] = useState([
        { id: 1, firstName: "John", lastName: "Doe" },
        { id: 2, firstName: "John2", lastName: "Doe2" },
        { id: 3, firstName: "John3", lastName: "Doe3" },
    ]);

    const [editData, setEditData] = useState(null);

    const defaultFormValues = {
        id: 0,
        firstName: "",
        lastName: "",
    };

    const methods = useForm({
        defaultValues: defaultFormValues,
    });

    useEffect(() => {
        methods.reset(editData);
    }, [editData, methods]);

    const handleFormReset = () => {
        methods.reset(defaultFormValues);
    };

    const handleFormSubmit = (person) => {
        try {
            if (person.id <= 0) {
                console.log("add");
                setPeople((previousPerson) => [...previousPerson, person]);
            } else {
                console.log("edit");
                setPeople((previousPerson) =>
                    previousPerson.map((p) =>
                        p.id === person.id ? person : p,
                    ),
                );
            }
            methods.reset(defaultFormValues);
            toast.success("Saved successfully!");
        } catch (error) {
            toast.error("Error has occurred!");
        } finally {
        }
    };

    const handlePersonEdit = (person) => {
        setEditData(person);
    };
    const handlePersonDelete = (person) => {
        if (
            !confirm(
                `Are you sure to delete a person: ${person.firstName} ${person.lastName} `,
            )
        )
            return;
        try {
            setPeople((previousPerson) =>
                previousPerson.filter((p) => p.id !== person.id),
            );
            toast.success("Deleted successfully!");
        } catch (error) {
            toast.error("Error on deleting!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>
                </div>

                <PersonForm
                    methods={methods}
                    onFormReset={handleFormReset}
                    onFormSubmit={handleFormSubmit}
                />
                <PersonList
                    peopleList={people}
                    onPersonEdit={handlePersonEdit}
                    onPersonDelete={handlePersonDelete}
                />
            </div>
        </div>
    );
}

export default Person;
