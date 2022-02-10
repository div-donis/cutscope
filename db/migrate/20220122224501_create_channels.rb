class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :subject
      t.boolean :unreads

      t.timestamps
    end
  end
end
