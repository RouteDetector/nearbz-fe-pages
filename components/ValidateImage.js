const ValidateImage = () => {
    return (   
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Ok! Let's check if that is really you.</Text>
            <Text>Please take a picture of you to validate.</Text>
            <TouchableOpacity onPress={this.imageGalleryLaunch} style={styles.button}  >
                <Text style={styles.buttonText}>Open camera</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ValidateImage