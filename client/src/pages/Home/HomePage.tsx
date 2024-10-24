import CollectionSection from "@components/Collection";


const HomePage = () => {
    // hardcode for now, will need to refactor go to use graphql
    const frontpagecollectionHandle = 'frontpage'
    return (
        <div>
            <CollectionSection collectionHandle={frontpagecollectionHandle}/>
        </div>
    )
}

export default HomePage;