import CollectionSection from "@components/Collection";


const HomePage = () => {
    // hardcode for now, will need to refactor go to use graphql
    const frontpageCollectionId = '284927918163'
    return (
        <div>
            <CollectionSection collectionId={frontpageCollectionId}/>
        </div>
    )
}

export default HomePage;