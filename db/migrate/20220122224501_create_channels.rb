class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :subject
      t.string :image

      t.timestamps
    end
  end
end
