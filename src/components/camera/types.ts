export interface CameraModalType {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleOptionSelect: (option: 'camera' | 'gallery') => Promise<void>;
}
